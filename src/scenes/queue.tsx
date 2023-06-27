
import { Circle, Node, Layout, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, createRef, makeRef, PossibleSpacing, range, Reference, SignalValue, ThreadGenerator, waitFor, waitUntil } from '@motion-canvas/core';
import { CodeBlock, lines } from '@motion-canvas/2d/lib/components/CodeBlock';

export default makeScene2D(function*(view) {
  const queueValues = [10, 20, 30, 40, 50];
  const rectRefs: Rect[] = [];
  const queueRef: Rect[] = [];
  const headRef = createRef<Txt>();
  const tailRef = createRef<Node>();
  const codeRef = createRef<CodeBlock>();

  // Set baackground color
  view.fill("#282a36");

  // Create stack
  view.add(createQueue(queueRef));

  // Add head
  view.add(
    <Layout direction={"column"} alignItems={"center"} layout>
      <Node
        ref={headRef}
        x={queueRef[0].x()}
        y={-150}
      >
        <Txt
          fill={"#f8f8f2"}
        >
          Head
        </Txt >
        <Txt
          fill={"#f8f8f2"}
        >
          &darr;
        </Txt >
      </Node>
    </Layout>
  );

  // Add tail
  view.add(
    <Layout direction={"column"} alignItems={"center"} layout>
      <Node
        ref={tailRef}
        x={queueRef[0].x()}
        y={200}>
        <Txt
          fill={"#f8f8f2"}
        >
          &uarr;
        </Txt >
        <Txt
          fill={"#f8f8f2"}
        >
          Tail
        </Txt >
      </Node>
    </Layout>
  );

  view.add(
    <CodeBlock
      ref={codeRef}
      code={`
        enqueue(10);
        enqueue(20);
        dequeue();
        enqueue(30);
        dequeue();
        enqueue(40);
        enqueue(50);
        dequeue();
        dequeue();
      `}
      x={400}
      y={100}
    />
  );

  view.add(
    <Txt
      fill={"#f8f8f2"}
      x={0}
      y={-400}
      fontSize={100}
    >
      Queue
    </Txt>
  );

  // Add all numbers where operation needs to be done
  view.add(
    range(queueValues.length).map((i: number) =>
      <Rect
        ref={makeRef(rectRefs, i)}
        width={100}
        height={100}
        x={150}
        y={-150 + 120 * i}
        fill="#ff5555"
        radius={10}
        textAlign="center"
        alignItems="center"
      >
        <Txt fill={"#f8f8f2"}>{queueValues[i].toString()}</Txt>
      </Rect>
    )
  );

  // Enqueue 10
  yield* all(
    rectRefs[0].x(queueRef[0].x(), 1),
    rectRefs[0].y(queueRef[0].y(), 1),
    codeRef().selection(lines(0), 1),
  );
  // Enqueue 20
  yield* all(
    rectRefs[1].x(queueRef[1].x(), 1),
    rectRefs[1].y(queueRef[1].y(), 1),
    tailRef().position.x(queueRef[1].x(), 1),
    // tailArrowRef().position.x(queueRef[1].x(), 1),
    codeRef().selection(lines(1), 1),
  );
  // Dequeue
  yield* all(
    rectRefs[0].x(-3000, 1),
    headRef().position.x(queueRef[1].x(), 1),
    codeRef().selection(lines(2), 1),
  );
  // Enqueue 30
  yield* all(
    rectRefs[2].x(queueRef[2].x(), 1),
    rectRefs[2].y(queueRef[2].y(), 1),
    tailRef().position.x(queueRef[2].x(), 1),
    // tailArrowRef().position.x(queueRef[2].x(), 1),
    codeRef().selection(lines(3), 1),
  );
  // Dequeue
  yield* all(
    rectRefs[1].x(-3000, 1),
    headRef().position.x(queueRef[2].x(), 1),
    codeRef().selection(lines(4), 1),
  );
  // Enqueue 40
  yield* all(
    rectRefs[3].x(queueRef[3].x(), 1),
    rectRefs[3].y(queueRef[3].y(), 1),
    tailRef().position.x(queueRef[3].x(), 1),
    // tailArrowRef().position.x(queueRef[3].x(), 1),
    codeRef().selection(lines(5), 1),
  );
  // Enqueue 50
  yield* all(
    rectRefs[4].x(queueRef[4].x(), 1),
    rectRefs[4].y(queueRef[4].y(), 1),
    tailRef().position.x(queueRef[4].x(), 1),
    // tailArrowRef().position.x(queueRef[4].x(), 1),
    codeRef().selection(lines(6), 1),
  );
  // Dequeue
  yield* all(
    rectRefs[2].x(-3000, 1),
    headRef().position.x(queueRef[3].x(), 1),
    codeRef().selection(lines(7), 1),
  );
  // Dequeue
  yield* all(
    rectRefs[3].x(-3000, 1),
    headRef().position.x(queueRef[4].x(), 1),
    codeRef().selection(lines(8), 1),
  );
});

function createQueue(queueRef: Rect[]) {
  return range(6).map((i: number) => {
    let radius: SignalValue<PossibleSpacing> = [0, 0, 0, 0];

    if (i === 0) {
      radius = [10, 0, 0, 10];
    } else if (i === 5) {
      radius = [0, 10, 10, 0];
    }
    return (
      <Rect>
        <Txt
          fill={"white"}
          x={-750 + 130 * i}
          y={-50}
        >
          {i.toString()}
        </Txt>
        <Rect
          ref={makeRef(queueRef, i)}
          fill="#50fa7b"
          width={125}
          height={125}
          radius={radius}
          x={-750 + 130 * i}
          y={50}
        >
        </Rect>
      </Rect>
    )
  }
  )
}


