import { NativeAdapter } from "./adapter/native.adapter.class";
import { Button } from "./button.enum";
import { Mouse } from "./mouse.class";
import { Point } from "./point.class";
import { LineHelper } from "./util/linehelper.class";

jest.mock("./adapter/native.adapter.class");

beforeEach(() => {
  jest.resetAllMocks();
});

const linehelper = new LineHelper();

describe("Mouse class", () => {
  it("should have a default delay of 500 ms", () => {
    // GIVEN
    const adapterMock = new NativeAdapter();
    const SUT = new Mouse(adapterMock);

    // WHEN

    // THEN
    expect(SUT.config.autoDelayMs).toEqual(100);
  });

  it("should forward scrollLeft to the native adapter class", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = await SUT.scrollLeft(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollLeft).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollRight to the native adapter class", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = await SUT.scrollRight(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollRight).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollDown to the native adapter class", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = await SUT.scrollDown(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollDown).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward scrollUp to the native adapter class", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const scrollAmount = 5;

    // WHEN
    const result = await SUT.scrollUp(scrollAmount);

    // THEN
    expect(nativeAdapterMock.scrollUp).toBeCalledWith(scrollAmount);
    expect(result).toBe(SUT);
  });

  it("should forward leftClick to the native adapter class", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);

    // WHEN
    const result = await SUT.leftClick();

    // THEN
    expect(nativeAdapterMock.leftClick).toBeCalled();
    expect(result).toBe(SUT);
  });

  it("should forward rightClick to the native adapter class", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);

    // WHEN
    const result = await SUT.rightClick();

    // THEN
    expect(nativeAdapterMock.rightClick).toBeCalled();
    expect(result).toBe(SUT);
  });

  it("update mouse position along path on move", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const path = linehelper.straightLine(new Point(0, 0), new Point(10, 10));

    // WHEN
    const result = await SUT.move(path);

    // THEN
    expect(nativeAdapterMock.setMousePosition).toBeCalledTimes(path.length);
    expect(result).toBe(SUT);
  });

  it("should press and hold left mouse button, move and release left mouse button on drag", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    const path = linehelper.straightLine(new Point(0, 0), new Point(10, 10));

    // WHEN
    const result = await SUT.drag(path);

    // THEN
    expect(nativeAdapterMock.pressButton).toBeCalledWith(Button.LEFT);
    expect(nativeAdapterMock.setMousePosition).toBeCalledTimes(path.length);
    expect(nativeAdapterMock.releaseButton).toBeCalledWith(Button.LEFT);
    expect(result).toBe(SUT);
  });

  it("should forward leftButtonDown to native adapter", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    // WHEN
    await SUT.leftButtonDown();
    // THEN
    expect(nativeAdapterMock.pressButton).toBeCalledWith(Button.LEFT);
  });

  it("should forward rightButtonDown to native adapter", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    // WHEN
    await SUT.rightButtonDown();
    // THEN
    expect(nativeAdapterMock.pressButton).toBeCalledWith(Button.RIGHT);
  });

  it("should forward middleButtonDown to native adapter", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    // WHEN
    await SUT.middleButtonDown();
    // THEN
    expect(nativeAdapterMock.pressButton).toBeCalledWith(Button.MIDDLE);
  });

  it("should forward leftButtonUp to native adapter", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    // WHEN
    await SUT.leftButtonUp();
    // THEN
    expect(nativeAdapterMock.releaseButton).toBeCalledWith(Button.LEFT);
  });

  it("should forward rightButtonUp to native adapter", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    // WHEN
    await SUT.rightButtonUp();
    //THEN
    expect(nativeAdapterMock.releaseButton).toBeCalledWith(Button.RIGHT);
  });

  it("should forward middleButtonUp to native adapter", async () => {
    // GIVEN
    const nativeAdapterMock = new NativeAdapter();
    const SUT = new Mouse(nativeAdapterMock);
    // WHEN
    await SUT.middleButtonUp();
    //THEN
    expect(nativeAdapterMock.releaseButton).toBeCalledWith(Button.MIDDLE);
  });
});
