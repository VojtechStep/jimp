declare namespace jimp {
    type ConstructorTest = (...args: any[]) => boolean;
    type ConstructorRun = (resolve: () => void, reject: (error: Error) => void, ...args: any[]) => void;
    type Callback<T, U = void> = (this: JimpImage, err: Error|null, data?: T) => U;
    type StaticCallback<T, U = void> = (err: Error|null, data?: T) => U;
    type ImageCallback<U = void> = Callback<JimpImage, U>;
    type Mime = string;
    type PngFilter = number;
    type ResizeMode = string;
    type Align = number;
    type FontLocation = string;
    type EdgeHandling = number;
    type Matrix = number[][];

    type RGB = {
      r: number;
      g: number;
      b: number;
    }

    type RGBA = {
      r: number;
      g: number;
      b: number;
      a: number;
    }

    interface Bitmap {
      width: number;
      height: number;
      data: Uint8Array;
    }

    interface Constructor {
      name: string;
      test: ConstructorTest;
      run: ConstructorRun;
    }
    type ImageDifference = {
      diff: JimpImage;
      percent: number;
    }

    type Histogram = {
      r: number[];
      g: number[];
      b: number[];
    }

    type ColorAction = {
      apply: string;
      params: any[];
    }

    type FontChar = {
      id: number;
      x: number;
      y: number;
      width: number;
      height: number;
      xoffset: number;
      yoffset: number;
      xadvance: number;
      page: number;
      chnl: number;
    }

    type FontKerning = {
      first: number;
      second: number;
      amount: number;
    }

    type FontInfo = {
      face: string;
      size: number;
      bold: number;
      italic: number;
      charset: string;
      unicode: number;
      stretchH: number;
      smooth: number;
      aa: number;
      padding: [number, number, number, number];
      spacing: [number, number];
    };

    type FontCommon = {
      lineHeight: number;
      base: number;
      scaleW: number;
      scaleH: number;
      pages: number;
      packed: number;
      alphaChnl: number;
      redChnl: number;
      greenChnl: number;
      blueChnl: number;
    }

    interface Font {
      pages: string[];
      chars: FontChar[];
      kerning: FontKerning[];
      info: FontInfo;
      common: FontCommon;
    }

    type Text = string | {
      text: string;
      alignmentX?: Align;
      alignmentY?: Align;
    }

    class JimpConstants {
      /*
      * Used for autoresizing etc.
      */
      static AUTO: number;

      /*
      * Supported mime types
      */
      static MIME_PNG: Mime;
      static MIME_JPEG: Mime;
      static MIME_JGD: Mime;
      static MIME_BMP: Mime;
      static MIME_X_MS_BMP: Mime;
      static MIME_GIF: Mime;

      /*
      * PNG filter types
      */
      static PNG_FILTER_AUTO: PngFilter;
      static PNG_FILTER_NONE: PngFilter;
      static PNG_FILTER_SUB: PngFilter;
      static PNG_FILTER_UP: PngFilter;
      static PNG_FILTER_AVERAGE: PngFilter;
      static PNG_FILTER_PAETH: PngFilter;

      static RESIZE_NEAREST_NEIGHBOR: ResizeMode;
      static RESIZE_BILINEAR: ResizeMode;
      static RESIZE_BICUBIC: ResizeMode;
      static RESIZE_HERMITE: ResizeMode;
      static RESIZE_BEZIER: ResizeMode;

      /*
      * Align modes
      */
      static HORIZONTAL_ALIGN_LEFT: Align;
      static HORIZONTAL_ALIGN_CERNTER: Align;
      static HORIZONTAL_ALIGN_RIGHT: Align;
      static VERTICAL_ALIGN_TOP: Align;
      static VERTICAL_ALIGN_CENTER: Align;
      static VERTICAL_ALIGN_BOTTOM: Align;

      /*
      * Font locations
      */
      static dirName: FontLocation;
      static FONT_SANS_8_BLACK: FontLocation;
      static FONT_SANS_16_BLACK: FontLocation;
      static FONT_SANS_32_BLACK: FontLocation;
      static FONT_SANS_64_BLACK: FontLocation;
      static FONT_SANS_128_BLACK: FontLocation;
      static FONT_SANS_8_WHITE: FontLocation;
      static FONT_SANS_16_WHITE: FontLocation;
      static FONT_SANS_32_WHITE: FontLocation;
      static FONT_SANS_64_WHITE: FontLocation;
      static FONT_SANS_128_WHITE: FontLocation;

      /*
      * Edge
      */
      static EDGE_EXTEND: EdgeHandling;
      static EDGE_WRAP: EdgeHandling;
      static EDGE_CROP: EdgeHandling;

    }

    class JimpImage extends JimpConstants {
      /*
      * Priavte fields
      */
      private __extraConstructors: any[];
      private _quality: number;
      private _deflateLevel: number;
      private _deflateStrategy: number;
      private _filterType: number;
      private _rgba: boolean;
      private _background: number;
      private _originalMime: Mime;
      private _exif: any;

      /*
      * Constructors
      */
      constructor(path: string, callback?: ImageCallback);
      constructor(jimp: JimpImage, callback?: ImageCallback);
      constructor(buffer: Buffer, callback?: ImageCallback);
      constructor(width: number, height: number, callback?: ImageCallback);
      constructor(width: number, height: number, background: number, callback?: ImageCallback);
      /*
      * Static methods
      */
      static appendConstructorOption(name: string, test: ConstructorTest, runner: ConstructorRun): void;
      static read(path: string): Promise<JimpImage>;
      static read(buffer: Buffer): Promise<JimpImage>;
      static rgbaToInt(r: number, g: number, b: number, a:number): number;
      static rgbaToInt<T>(r: number, g: number, b:number, a: number, callback: StaticCallback<number, T>): T;
      static intToRGBA(i: number): RGBA;
      static intToRGBA<T>(i: number, callback: StaticCallback<RGBA, T>): T;
      static limit255(n: number): number;
      static diff(img1: JimpImage, img2: JimpImage, treshold?: number): ImageDifference;
      static distance(img1: JimpImage, img2: JimpImage): number;
      static colorDiff(rgba1: RGBA, rgba2: RGBA): number;
      static loadFont(path: string): Promise<Font>;
      static loadFont(path: string, callback: StaticCallback<Font>): never;

      /*
      * Methods
      */
      clone(): this;
      clone<T>(callback: ImageCallback<T>): T;
      cloneQuiet(): this;
      cloneQuiet<T>(callback: ImageCallback<T>): T;

      quality(n: number): this;
      quality<T>(n: number, callback: ImageCallback<T>): T;
      deflateLevel(l: number): this;
      deflateLevel<T>(l: number, callback: ImageCallback<T>): T;
      deflateStrategy(s: number): this;
      deflateStrategy<T>(s: number, callback: ImageCallback<T>): T;
      filterType(f: number): this;
      filterType<T>(f: number, callback: ImageCallback<T>): T;
      rgba(bool: boolean): this;
      rgba<T>(bool: boolean, callback: ImageCallback<T>): T;
      background(hex: number): this;
      background<T>(hex: number, callback: ImageCallback<T>): T;
      backgroundQuiet(hex: number): this;
      backgroundQuiet<T>(hex: number, callback: ImageCallback<T>): T;
      scan(x: number, y: number, width: number, height: number, f: (x: number, y: number, index: number) => void): this;
      scan<T>(x: number, y: number, width: number, height: number, f: (x: number, y: number, index: number) => void, callback: ImageCallback<T>): T;
      scanQuiet(x: number, y: number, width: number, height: number, f: (x: number, y: number, index: number) => void): this;
      scanQuiet<T>(x: number, y: number, width: number, height: number, f: (x: number, y: number, index: number) => void, callback: ImageCallback<T>): T;
      getMime(): Mime;
      getExtension(): string;
      getPixelIndex(x: number, y: number, edgeHandling: EdgeHandling): number;
      getPixelIndex<T>(x: number, y: number, edgeHandling: EdgeHandling, calllback: (i: number) => T): T;
      getPixelColor(x: number, y: number): number;
      getPixelColor<T>(x: number, y: number, callback: Callback<number, T>): T;
      getPixelColour(x: number, y: number): number;
      getPixelColour<T>(x: number, y: number, callback: Callback<number, T>): T;
      setPixelColor(hex: number, x: number, y: number): this;
      setPixelColor<T>(hex: number, x: number, y: number, callback: ImageCallback<T>): T;
      setPixelColour(hex: number, x: number, y: number): this;
      setPixelColour<T>(hex: number, x: number, y: number, callback: ImageCallback<T>): T;
      hash(base?: number): string;
      hash<T>(callback: Callback<string, T>): T;
      hash<T>(base: number, callback: Callback<string, T>): T;
      crop(x: number, y: number, width: number, height: number): this;
      crop<T>(x: number, y: number, width: number, height: number, callback: ImageCallback<T>): T;
      cropQuiet(x: number, y: number, width: number, height: number): this;
      cropQuiet<T>(x: number, y: number, width: number, height: number, callback: ImageCallback<T>): T;
      autoCrop(): this;
      autoCrop<T>(callback: ImageCallback<T>): T;
      autoCrop(tolerance: number): this;
      autoCrop<T>(tolerance: number, callback: ImageCallback<T>): T;
      autoCrop(tolerance: number, cropOnlyFrames: boolean): this;
      autoCrop<T>(tolerance: number, cropOnlyFrames: boolean, callback: ImageCallback<T>): T;
      blit(src: JimpImage, x: number, y: number): this;
      blit<T>(src: JimpImage, x: number, y: number, callback: ImageCallback<T>): T;
      blit(src: JimpImage, x: number, y: number, srcx: number, srcy: number, srcw: number, srch: number): this;
      blit<T>(src: JimpImage, x: number, y: number, srcx: number, srcy: number, srcw: number, srch: number, callback: ImageCallback<T>): T;
      mask(src: JimpImage, x: number, y: number): this;
      mask<T>(src: JimpImage, x: number, y: number, callback: ImageCallback<T>): T;
      composite(src: JimpImage, x: number, y: number): this;
      composite<T>(src: JimpImage, x: number, y: number, callback: ImageCallback<T>): T;
      brightness(value: number): this;
      brightness<T>(value: number, callback: ImageCallback<T>): T;
      contrast(value: number): this;
      contrast<T>(value: number, callback: ImageCallback<T>): T;
      posterize(n: number): this;
      posterize<T>(n: number, callback: ImageCallback<T>): T;
      normalize(): this;
      normalize<T>(callback: ImageCallback<T>): T;
      mirror(horizontal: boolean, vertical: boolean): this;
      mirror<T>(horizontal: boolean, vertical: boolean, callback: ImageCallback<T>): T;
      flip(horizontal: boolean, vertical: boolean): this;
      flip<T>(horizontal: boolean, vertical: boolean, callback: ImageCallback<T>): T;
      gaussian(r: number): this;
      gaussian<T>(r: number, callback: ImageCallback<T>): T;
      blur(r: number): this;
      blur<T>(r: number, callback: ImageCallback<T>): T;
      convolution(kernel: Matrix): this;
      convolution<T>(kernel: Matrix, callback: ImageCallback<T>): T;
      convolution(kernel: Matrix, edgeHandling: EdgeHandling): this;
      convolution<T>(kernel: Matrix, edgeHandling: EdgeHandling, callback: ImageCallback<T>): T;
      greyscale(): this;
      greyscale<T>(callback: ImageCallback<T>): T;
      grayscale(): this;
      grayscale<T>(callback: ImageCallback<T>): T;
      sepia(): this;
      sepia<T>(callback: ImageCallback<T>): T;
      opacity(f: number): this;
      opacity<T>(f: number, callback: ImageCallback<T>): T;
      fade(f: number): this;
      fade<T>(f: number, callback: ImageCallback<T>): T;
      opaque(): this;
      opaque<T>(callback: ImageCallback<T>): T;
      resize(width: number, height: number): this;
      resize<T>(width: number, height: number, callback: ImageCallback<T>): T;
      resize(width: number, height: number, mode: ResizeMode): this;
      resize<T>(width: number, height: number, mode: ResizeMode, callback: ImageCallback<T>): T;
      cover(width: number, height: number): this;
      cover<T>(width: number, height: number, callback: ImageCallback<T>): T;
      cover(width: number, height: number, alignBits: Align): this;
      cover<T>(width: number, height: number, alignBits: Align, callback: ImageCallback<T>): T;
      cover(width: number, height: number, alignBits: Align, mode: ResizeMode): this;
      cover<T>(width: number, height: number, alignBits: Align, mode: ResizeMode, callback: ImageCallback<T>): T;
      contain(width: number, height: number): this;
      contain<T>(width: number, height: number, callback: ImageCallback<T>): T;
      contain(width: number, height: number, alignBits: Align): this;
      contain<T>(width: number, height: number, alignBits: Align, callback: ImageCallback<T>): T;
      contain(width: number, height: number, alignBits: Align, mode: ResizeMode): this;
      contain<T>(width: number, height: number, alignBits: Align, mode: ResizeMode, callback: ImageCallback<T>): T;
      scale(f: number): this;
      scale<T>(f: number, callback: ImageCallback<T>): T;
      scale(f: number, mode: ResizeMode): this;
      scale<T>(f: number, mode: ResizeMode, callback: ImageCallback<T>): T;
      scaleToFit(width: number, height: number): this;
      scaleToFit<T>(width: number, height: number, callback: ImageCallback<T>): T;
      scaleToFit(width: number, height: number, mode: ResizeMode): this;
      scaleToFit<T>(width: number, height: number, mode: ResizeMode, callback: ImageCallback<T>): T;
      pixelate(size: number): this;
      pixelate<T>(size: number, callback: ImageCallback<T>): T;
      pixelate(size: number, x: number, y: number): this;
      pixelate<T>(size: number, x: number, y: number, callback: ImageCallback<T>): T;
      pixelate(size: number, x: number, y: number, width: number, height: number): this;
      pixelate<T>(size: number, x: number, y: number, width: number, height: number, callback: ImageCallback<T>): T;
      convolute(kernel: Matrix): this;
      convolute<T>(kernel: Matrix, callback: ImageCallback<T>): T;
      convolute(kernel: Matrix, x: number, y: number): this;
      convolute<T>(kernel: Matrix, x: number, y: number, callback: ImageCallback<T>): T;
      convolute(kernel: Matrix, x: number, y: number, width: number, height: number): this;
      convolute<T>(kernel: Matrix, x: number, y: number, width: number, height: number, callback: ImageCallback<T>): T;
      rotate(deg: number): this;
      rotate<T>(deg: number, callback: ImageCallback<T>): T;
      rotate(deg: number, mode: ResizeMode | boolean): this;
      rotate<T>(deg: number, mode: ResizeMode | boolean, callback: ImageCallback<T>): T;
      displace(map: JimpImage, offset: number): this;
      displace<T>(map: JimpImage, offset: number, callback: ImageCallback<T>): T;
      getBuffer(mime: Mime, callback: Callback<Buffer>): this;
      getBase64(mime: Mime, callback: Callback<string>): this;
      dither565(): this;
      dither565<T>(callback: ImageCallback<T>): T;
      dither16(): this;
      dither16<T>(callback: ImageCallback<T>): T;
      color(action: ColorAction[]): this;
      color<T>(action: ColorAction[], callback: ImageCallback<T>): T;
      colour(action: ColorAction[]): this;
      colour<T>(action: ColorAction[], callback: ImageCallback<T>): T;
      print(font: Font, x: number, y: number, text: Text): this;
      print<T>(font: Font, x: number, y: number, text: Text, callback: ImageCallback<T>): T;
      print(font: Font, x: number, y: number, text: Text, maxWidth: number, maxHeight: number): this;
      print<T>(font: Font, x: number, y: number, text: Text, maxWidth: number, maxHeight: number, callback: ImageCallback<T>): T;
      write(path: string): this;
      write<T>(path: string, callback: ImageCallback<T>): T;
    }
  }

  declare module 'jimp' {
    export = jimp.JimpImage;
  }
