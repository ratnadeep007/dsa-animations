import { Circle, Node, Layout, makeScene2D, Rect, Txt } from '@motion-canvas/2d';
import { all, createRef, makeRef, range, Reference, Subscribable } from '@motion-canvas/core';


export default makeScene2D(function*(view) {
  const values = [10, 20, 30];
  const listRef: Rect[] = [];
  const subtitleRef = createRef<Txt>();
  const newNodeRef = createRef<Rect>();
  const tempRef = createRef<Txt>();
  const headRef = createRef<Txt>();
  const nullRef = createRef<Txt>();

  // Set background color
  view.fill("#282a36");

  // Draw text
  view.add(
    <Txt
      fill={"#f8f8f2"}
      x={0}
      y={-400}
      fontSize={100}
    >
      Linked List
    </Txt>
  );

  // Draw nodes
  view.add(createList(values, listRef));

  // add head
  view.add(
    <Txt
      ref={headRef}
      fill="#f8f8f2"
      x={listRef[0].position.x() - 200}
      y={listRef[0].position.y()}
    >
      Head &rarr;
    </Txt>
  );

  // add null
  view.add(
    <Txt
      ref={nullRef}
      fill="#f8f8f2"
      x={listRef[listRef.length - 1].position.x() + 250}
      y={listRef[listRef.length - 1].position.y()}
    >
      NULL
    </Txt>
  );

  // subtitle text
  view.insert(
    <Txt
      ref={subtitleRef}
      fill="#f8f8f2"
      x={0}
      y={-250}
      fontSize={0}
    >
      Insert (at begining)
    </Txt>
  );



  view.add(createNode("40", 0, -300, 0, newNodeRef, null, null));

  // Temp text
  view.insert(
    <Txt
      ref={tempRef}
      fill="#f8f8f2"
      x={newNodeRef().position.x()}
      y={newNodeRef().position.y()}
      fontSize={0}
    >
      Temp &rarr;
    </Txt>
  );

  newNodeRef().scale(0);

  // insert at begining
  yield* all(
    subtitleRef().fontSize(60, 1),
    newNodeRef().scale(1, 1),
    tempRef().fontSize(50, 1),
    tempRef().position.x(newNodeRef().position.x() - 190, 1),
  );
  yield* all(
    headRef().position.y(headRef().position.y() - 50, 1),
    newNodeRef().position.x(headRef().position.x() - 50, 1),
    newNodeRef().position.y(headRef().position.y() + 30, 1),
    tempRef().position.x(headRef().position.x() - 250, 1),
    tempRef().position.y(headRef().position.y() + 40, 1),
  )
  yield* all(
    headRef().position.x(newNodeRef().position.x() - 200, 1),
    headRef().position.y(newNodeRef().position.y(), 1),
    tempRef().fontSize(0, 1),
  );
  yield* all(
    newNodeRef().position.y(newNodeRef().position.y() - 30, 1),
    headRef().position.y(headRef().position.y() - 30, 1),
  );

  yield* subtitleRef().fontSize(0, 0.5);
  // end of insert at begining


  // remove from begining
  yield* subtitleRef().text("Delete (at begining)", 1);
  yield* subtitleRef().fontSize(60, 1);
  yield* all(
    newNodeRef().position.x(0, 1),
    newNodeRef().position.y(300, 1),
    headRef().position.x(listRef[0].position.x() - 200, 1),
  );
  // delete at begining

});

function createList(values: number[], listRef: Rect[]) {
  return range(values.length).map((i: number) => {
    return createNode(`${values[i]}`, 255, 0, 250, null, listRef, i);
  });
}

function createNode(value: string, x: number, y: number, offset: number, rectRef?: Reference<Rect>, listRef?: Rect[], index?: number,) {
  return (
    <Rect
      ref={index !== null ? makeRef(listRef, index) : rectRef}
      fill="#50fa7b"
      radius={[10, 10, 10, 10]}
      width={200}
      height={100}
      alignItems="center"
      x={-x + offset * index}
      y={-y}
    >
      <Txt x={0} y={0} fill="#44475a">{value}</Txt>
      <Txt
        fill="#50fa7b"
        fontSize={90}
        x={120}
        y={10}
      >
        &rarr;
      </Txt>
    </Rect>
  );
}