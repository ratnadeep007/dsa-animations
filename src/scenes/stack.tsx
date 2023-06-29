import { Circle, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, createRef, makeRef, PossibleSpacing, range, Reference, SignalValue, ThreadGenerator, waitFor, waitUntil } from '@motion-canvas/core';
import { CodeBlock, lines } from '@motion-canvas/2d/lib/components/CodeBlock';
import { DraculaColors } from '../utils/colors';

export default makeScene2D(function*(view) {
  const stackValues = [10, 20, 30, 40, 50];
  const rectRefs: Rect[] = [];
  const stackRef: Rect[] = [];
  const topRef = createRef<Txt>();
  const codeRef = createRef<CodeBlock>();

  // Set baackground color
  view.fill(DraculaColors.Background);

  // Create stack
  view.add(createStack(stackRef));

  // Add top
  view.add(
    <Txt
      ref={topRef}
      fill={DraculaColors.Foreground}
      x={-700}
      y={stackRef[stackRef.length - 1].y()}
    >
      Top &rarr;
    </Txt >
  );

  view.add(
    <CodeBlock
      ref={codeRef}
      code={`
        push(10);
        push(20);
        pop();
        push(30);
        pop();
        push(40);
        push(50);
        pop();
        pop();
      `}
      x={200}
      y={200}
    />
  );

  view.add(
    <Txt
      fill={DraculaColors.Foreground}
      x={0}
      y={-400}
      fontSize={100}
    >
      Stack
    </Txt>
  );

  // Add all numbers where operation needs to be done
  view.add(
    range(stackValues.length).map((i: number) =>
      <Rect
        ref={makeRef(rectRefs, i)}
        width={100}
        height={100}
        x={-150 + 200 * i}
        y={-200}
        fill={DraculaColors.Red}
        radius={10}
        textAlign="center"
        alignItems="center"
      >
        <Txt fill={DraculaColors.Foreground}>{stackValues[i].toString()}</Txt>
      </Rect>
    )
  )

  // Push 10
  yield* all(
    rectRefs[0].x(stackRef[stackRef.length - 1].x(), 1),
    rectRefs[0].y(stackRef[stackRef.length - 1].y(), 1),
    // topRef().position.y(stackRef[stackRef.length - 1].y(), 1),
    codeRef().selection(lines(0), 1),
  );
  // Push 20
  yield* all(
    rectRefs[1].x(stackRef[stackRef.length - 2].x(), 1),
    rectRefs[1].y(stackRef[stackRef.length - 2].y(), 1),
    topRef().position.y(stackRef[stackRef.length - 2].y(), 1),
    codeRef().selection(lines(1), 1),
  );
  // Pop
  yield* all(
    rectRefs[1].x(-3000, 1),
    topRef().position.y(stackRef[stackRef.length - 1].y(), 1),
    codeRef().selection(lines(2), 1),
  );
  // Push 30
  yield* all(
    rectRefs[2].x(stackRef[stackRef.length - 2].x(), 1),
    rectRefs[2].y(stackRef[stackRef.length - 2].y(), 1),
    topRef().position.y(stackRef[stackRef.length - 2].y(), 1),
    codeRef().selection(lines(3), 1),
  );
  // Pop
  yield* all(
    rectRefs[2].x(-3000, 1),
    topRef().position.y(stackRef[stackRef.length - 1].y(), 1),
    codeRef().selection(lines(4), 1),
  );
  // Push 40
  yield* all(
    rectRefs[3].x(stackRef[stackRef.length - 2].x(), 1),
    rectRefs[3].y(stackRef[stackRef.length - 2].y(), 1),
    topRef().position.y(stackRef[stackRef.length - 2].y(), 1),
    codeRef().selection(lines(5), 1),
  );
  // Push 50
  yield* all(
    rectRefs[4].x(stackRef[stackRef.length - 3].x(), 1),
    rectRefs[4].y(stackRef[stackRef.length - 3].y(), 1),
    topRef().position.y(stackRef[stackRef.length - 3].y(), 1),
    codeRef().selection(lines(6), 1),
  );
  // Pop
  yield* all(
    rectRefs[4].x(-3000, 1),
    topRef().position.y(stackRef[stackRef.length - 2].y(), 1),
    codeRef().selection(lines(7), 1),
  );
  // Pop
  yield* all(
    rectRefs[3].x(-3000, 1),
    topRef().position.y(stackRef[stackRef.length - 1].y(), 1),
    codeRef().selection(lines(8), 1),
  );
});

function createStack(stackRef: Rect[]) {
  return range(6).map((i: number) => {
    let radius: SignalValue<PossibleSpacing> = [0, 0, 0, 0];

    if (i === 0) {
      radius = [10, 10, 0, 0];
    } else if (i === 5) {
      radius = [0, 0, 10, 10];
    }
    return (
      <Rect>
        <Txt
          fill={DraculaColors.Foreground}
          x={-600}
          y={-300 + 130 * i}
        >
          {i.toString()}
        </Txt>
        <Rect
          ref={makeRef(stackRef, i)}
          fill={DraculaColors.Green}
          width={125}
          height={125}
          radius={radius}
          x={-500}
          y={-300 + 130 * i}
        >
        </Rect>
      </Rect>
    )
  }
  )
}


