// point at the real files in your gl/ folder:
import Gl from './gl/index.js';
import Blob from './gl/Blob.js';
// ← no `import gsap` here — GSAP is now on window.gsap

class App {
  constructor() {
    this.blobs = [];
    this.addBlobs();

    // use the global gsap
    this.tl = gsap.timeline({ delay: 0.25 })
      .add(this.article())
      .add(this.animBlobs(), '-=1.5');
  }

  addBlobs() {
    // the original “rightmost” blob params:
    const blob = new Blob(
      3,      // size
      0.3,    // speed
      0.25,   // color
      2.0,    // freq
      0.15,   // density
      Math.PI // strength/offset
    );
    blob.position.set(0, 0, 0);
    Gl.scene.add(blob);
    this.blobs = [ blob ];
  }

  article() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    const content = document.querySelector('.content span');
    const contentClip = { x: 0 };

    return tl
      .from('.title div, .subtitle div', { duration: 2, xPercent: -100 })
      .from('.menu__inner-translate', { duration: 1.5, yPercent: -100 }, '-=1.5')
      .to(contentClip, {
        duration: 1.5,
        x: 100,
        onUpdate: () => content.style.setProperty('--clip', `${contentClip.x}%`)
      }, '-=1.25')
      .from('.play', { duration: 1, scale: 0, rotate: '-62deg' }, '-=1.5');
  }

  animBlobs() {
    return gsap.timeline().from(this.blobs[0].scale, {
      duration: 2,
      x: 0,
      y: 0,
      z: 0,
      ease: 'power3.inOut'
    });
  }
}

new App();