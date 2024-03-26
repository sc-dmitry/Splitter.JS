class Splitter {
  constructor(arg) {

    let dragDiv = this.#getDom(arg);
    let isDragging = false;
    let startX, startY;
    let shiftX = 0, shiftY = 0;
  

  
    function startDrag(event) {
      isDragging = true;
      startX = event.clientX;
      startY = event.clientY;
  
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', stopDrag);
    }
  
    function handleDrag(event) {
      if (!isDragging) return;
  
      const currentX = event.clientX;
      const currentY = event.clientY;
  
      shiftX = currentX - startX;
      shiftY = currentY - startY;
  
      // Example: Log the horizontal and vertical shift
      console.log('Horizontal shift:', shiftX, 'Vertical shift:', shiftY);
   
  
      // You can perform further actions here based on the shift
      // For example, update the position of an element
    }
  
    function stopDrag() {
      if (!isDragging) return;
  
      isDragging = false;
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', stopDrag);
  
      // Example: Reset shift values after drag
      shiftX = 0;
      shiftY = 0;
    }
  


    dragDiv.addEventListener('mousedown', startDrag);

  }

  #getDom(arg) {
    const element = arg instanceof HTMLElement ? arg : document.getElementById(arg)
    if(element == null) console.log('No element${arg} found method: #getdom()');

    // console.log('Element${arg} found method: #getdom()');
    return element;
  }

  addPane(arg, kx, ky) {
    this.panes.push(new ResizePane(this.#getDom(arg), kx, ky));
  }

  // Nested class definition

}

class ResizePane {
  constructor(pane, kx, ky) {
    this.pane = pane;
    this.kx = kx;
    this.ky = ky;
  }
}

