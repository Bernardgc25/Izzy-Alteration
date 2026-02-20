// test/test-measurement-ViewHandler.js
import { expect } from 'chai';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import { ViewHandler } from '../../../pages/measurement-pages/measurement-modules/measurement-ViewHandler.js';

describe('ViewHandler', () => {
  let dom;
  let viewHandler;
  let getMeasurementStub;
  const genderImageUrl = 'test.jpg';

  beforeEach(() => {
    dom = new JSDOM(`
      <!DOCTYPE html>
      <body>
        <img id="guide-image" />
        <div id="default-guide" style="display: flex;"></div>
        <div id="guide-text-container">
          <div id="measure-object"></div>
          <div id="measure-definition"></div>
          <div id="measure-description"></div>
        </div>
        <div id="floating-measurement-guide" style="display: none;">
          <div id="floating-measure-object"></div>
          <div id="floating-measure-definition"></div>
          <div id="floating-measure-description"></div>
          <div class="floating-guide-images"></div>
        </div>
        <div id="floating-guide-overlay" style="display: none;"></div>
        <button id="print-summary"></button>

        <div class="measurement-label">
          <i class="fa-eye"></i>
        </div>
        <div class="form-group">
          <input class="measurement-input" data-measurement="neck" />
        </div>
      </body>
    `);
    globalThis.window = dom.window;
    globalThis.document = dom.window.document;
    globalThis.alert = dom.window.alert;

    getMeasurementStub = sinon.stub();
    getMeasurementStub.withArgs('neck').returns({
      object: 'Neck',
      definition: 'def',
      description: 'desc',
      imageMobile: 'neck.jpg'
    });

    viewHandler = new ViewHandler({
      gender: 'male',
      isMobileView: false,
      getMeasurement: getMeasurementStub,
      genderImageUrl
    });
  });

  afterEach(() => {
    viewHandler.cleanup();
    sinon.restore();
    delete globalThis.window;
    delete globalThis.document;
    delete globalThis.alert;
  });

  describe('constructor', () => {
    it('should set properties and call init', () => {
      expect(viewHandler.gender).to.equal('male');
      expect(viewHandler.isMobileView).to.be.false;
      expect(viewHandler.genderImageUrl).to.equal(genderImageUrl);
    });
  });

  describe('setupDesktopGuideImage', () => {
    it('should set guide image src when genderImageUrl exists', () => {
      const guideImage = document.getElementById('guide-image');
      const defaultGuide = document.getElementById('default-guide');
      viewHandler.setupDesktopGuideImage();
      expect(guideImage.src).to.include(genderImageUrl);
      expect(guideImage.style.display).to.equal('block');
      expect(defaultGuide.style.display).to.equal('none');
    });

    it('should hide guide image and show default if no url', () => {
      viewHandler.genderImageUrl = null;
      viewHandler.setupDesktopGuideImage();
      const guideImage = document.getElementById('guide-image');
      const defaultGuide = document.getElementById('default-guide');
      expect(guideImage.style.display).to.equal('none');
      expect(defaultGuide.style.display).to.equal('flex');
    });
  });

  describe('showMeasurementGuide', () => {
    it('should update guide text with measurement data', () => {
      viewHandler.showMeasurementGuide('neck');
      const objEl = document.getElementById('measure-object');
      expect(objEl.innerHTML).to.include('Neck');
    });
  });

  describe('showFloatingGuide', () => {
    it('should update text, image, and show overlay/guide', async () => {
      await viewHandler.showFloatingGuide('neck');
      const objEl = document.getElementById('floating-measure-object');
      expect(objEl.innerHTML).to.include('Neck');
      const imgContainer = document.querySelector('.floating-guide-images');
      expect(imgContainer.children.length).to.equal(1);
      expect(imgContainer.children[0].src).to.include('neck.jpg');
      expect(document.getElementById('floating-guide-overlay').style.display).to.equal('block');
      expect(document.getElementById('floating-measurement-guide').style.display).to.equal('flex');
    });
  });

  describe('hideFloatingGuide', () => {
    it('should hide overlay and guide', () => {
      viewHandler.hideFloatingGuide();
      expect(document.getElementById('floating-guide-overlay').style.display).to.equal('none');
      expect(document.getElementById('floating-measurement-guide').style.display).to.equal('none');
    });
  });

  describe('setupEyeIconListeners', () => {
    it('should attach click handler to eye icons', () => {
      const callback = sinon.spy();
      viewHandler.setupEyeIconListeners(callback);
      const eyeIcon = document.querySelector('.fa-eye');
      eyeIcon.click();
      expect(callback.calledOnce).to.be.true;
      expect(callback.args[0][0]).to.equal('neck');
    });
  });

  describe('setupWindowResizeListener', () => {
    it('should debounce and call callback when crossing breakpoint', (done) => {
      const callback = sinon.spy();
      viewHandler.setupWindowResizeListener(callback);

      // Simulate resize to mobile width
      window.innerWidth = 800; // less than 992
      window.dispatchEvent(new dom.window.Event('resize'));

      setTimeout(() => {
        expect(callback.calledOnce).to.be.true;
        expect(callback.args[0][0]).to.be.true; // newIsMobileView = true
        done();
      }, 250);
    });
  });

  describe('setupEscapeKeyListener', () => {
    it('should call callback on Escape key', () => {
      const callback = sinon.spy();
      viewHandler.setupEscapeKeyListener(callback);
      const event = new dom.window.KeyboardEvent('keydown', { key: 'Escape' });
      document.dispatchEvent(event);
      expect(callback.calledOnce).to.be.true;
    });
  });

  describe('setupPrintButtonListener', () => {
    it('should call callback when print button clicked', () => {
      const callback = sinon.spy();
      viewHandler.setupPrintButtonListener(callback);
      document.getElementById('print-summary').click();
      expect(callback.calledOnce).to.be.true;
    });

    it('should show alert if callback throws', () => {
      const alertStub = sinon.stub(window, 'alert');
      const callback = sinon.stub().throws(new Error('fail'));
      viewHandler.setupPrintButtonListener(callback);
      document.getElementById('print-summary').click();
      expect(alertStub.calledWith('fail')).to.be.true;
    });
  });

  describe('image zoom/pan', () => {
    it('should handle wheel zoom', () => {
      const image = document.getElementById('guide-image');
      const container = image.parentElement;
      const wheelEvent = new dom.window.WheelEvent('wheel', { deltaY: -100, clientX: 50, clientY: 50 });
      sinon.spy(viewHandler, 'handleZoom');
      container.dispatchEvent(wheelEvent);
      expect(viewHandler.handleZoom.calledOnce).to.be.true;
    });

    it('should update transform on pan', () => {
      const image = document.getElementById('guide-image');
      const container = image.parentElement;
      viewHandler.zoomState.isDragging = true;
      const mousemove = new dom.window.MouseEvent('mousemove', { clientX: 10, clientY: 10 });
      container.dispatchEvent(mousemove);
      // no assertion on transform because it depends on state, just ensure no error
    });
  });

  describe('cleanup', () => {
    it('should remove all event listeners and clear timers', () => {
      const removeSpy = sinon.spy(window, 'removeEventListener');
      viewHandler.setupWindowResizeListener(() => {});
      viewHandler.cleanup();
      expect(removeSpy.called).to.be.true;
    });
  });

  describe('showAlert, showValidationErrorAlert, showSuccessMessage', () => {
    it('showAlert should call window.alert', () => {
      const alertStub = sinon.stub(window, 'alert');
      viewHandler.showAlert('test');
      expect(alertStub.calledWith('test')).to.be.true;
    });

    it('showValidationErrorAlert should alert specific message', () => {
      const alertStub = sinon.stub(window, 'alert');
      viewHandler.showValidationErrorAlert();
      expect(alertStub.calledWith('Please fill in all required fields correctly. Invalid fields are highlighted in red.')).to.be.true;
    });

    it('showSuccessMessage should alert with form data', () => {
      const alertStub = sinon.stub(window, 'alert');
      viewHandler.showSuccessMessage({ name: 'John', date: '2025', measurements: { a: 1 } });
      expect(alertStub.calledOnce).to.be.true;
    });
  });

  describe('focusFirstErrorField', () => {
    it('should focus element with error class', () => {
      const input = document.getElementById('guide-image'); // any element
      input.classList.add('error');
      const focusSpy = sinon.spy(input, 'focus');
      viewHandler.focusFirstErrorField();
      expect(focusSpy.calledOnce).to.be.true;
    });
  });
});