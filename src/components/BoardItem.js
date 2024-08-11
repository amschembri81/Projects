import React from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "BOARD_ITEM";

function BoardItem({ id, index, moveComponent, children, color }) {
  const ref = React.useRef(null);

  // Set up the drop functionality
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Prevent items from replacing themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Get the boundaries of the hovered element
      const hoverBoundingRect = ref.current.getBoundingClientRect();

      // Calculate the vertical middle of the hovered element
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Get the mouse position
      const clientOffset = monitor.getClientOffset();

      // Calculate how far the mouse is from the top of the hovered element
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Move the item if the mouse has crossed half of the hovered item's height
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Move the component to the new position
      moveComponent(dragIndex, hoverIndex);

      // Update the item's index to reflect the new position
      item.index = hoverIndex;
    },
  });

  // Set up the drag functionality
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Combine the drag and drop functionality into a single ref
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1, // Adjust opacity while dragging
        backgroundColor: color,
        marginBottom: "10px",
        cursor: "move", // Show a move cursor to indicate that the item is draggable
      }}
    >
      {children}
    </div>
  );
}

export default BoardItem;