class PerlinNoise {
  private permutation: number[];

  constructor() {
    this.permutation = this.generatePermutation();
  }

  private generatePermutation(): number[] {
    const permutation: number[] = [];
    for (let i = 0; i < 512; i++) {
      permutation[i] = Math.floor(Math.random() * 255);
    }
    return permutation;
  }

  private fade(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private lerp(t: number, a: number, b: number): number {
    return a + t * (b - a);
  }

  private grad(hash: number, x: number): number {
    const h = hash & 15;
    const grad = 1 + (h & 7); // Gradient value 1-8
    return (h & 8 ? -grad : grad) * x; // Randomly invert half of them
  }

  private perlin(x: number): number {
    const X = Math.floor(x) & 255;
    x -= Math.floor(x);
    const u = this.fade(x);
    return (
      this.lerp(
        u,
        this.grad(this.permutation[X], x),
        this.grad(this.permutation[X + 1], x - 1)
      ) * 2
    );
  }

  generateNoise(width: number, frequency: number, amplitude: number): number[] {
    const noise: number[] = [];

    for (let i = 0; i < width; i++) {
      const x = i * frequency;
      const n = this.perlin(x) * amplitude;
      noise.push(n);
    }

    return noise;
  }
}

export default function generatePerlinNoise(width: number, frequency: number, amplitude: number): number[] {
    return new PerlinNoise().generateNoise(width, frequency, amplitude);
}