import Gl from './gl';
import Blob from './gl/Blob';
import gsap from 'gsap';

class App {
  constructor() {
    this.blobs = [];
    this.addBlobs();

    this.tl = gsap.timeline({ delay: 0.25 });
    this.tl
      .add(this.article())
      .add(this.animBlobs(), '-=1.5');
  }

  addBlobs() {
    // Right-most blob’s original params:
    // size: 3, speed: 0.25, color: 0.5, freq: 1.5, density: 0.12, offset: 0
    const blob = new Blob(3, 0.25, 0.5, 1.5, 0.12, 0);
    blob.position.set(0, 0, 0);
    this.blobs = [blob];
    Gl.scene.add(blob);
  }

  article() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    const content = document.querySelector('.content span');
    const contentClip = { x: 0 };

    tl
      .from('.title div, .subtitle div', { duration: 2, xPercent: -100 })
      .from('.menu__inner-translate', { duration: 1.5, yPercent: -100 }, '-=1.5')
      .to(contentClip, {
        duration: 1.5,
        x: 100,
        onUpdate: () => content.style.setProperty('--clip', `${contentClip.x}%`)
      }, '-=1.25')
      .from('.play', { duration: 1, scale: 0, rotate: '-62deg' }, '-=1.5');

    return tl;
  }

  animBlobs() {
    const tl = gsap.timeline();
    const scale = this.blobs[0].scale;

    tl.from(scale, {
      duration: 2,
      x: 0, y: 0, z: 0,
      ease: 'power3.inOut'
    });

    return tl;
  }
}

new App();