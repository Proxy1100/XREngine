import { System, Entity } from "ecsy"
import MouseInput from "../components/MouseInput"
import LifecycleValue from "../enums/LifecycleValue"
import InputActionHandler from "../components/InputActionHandler"
import UserInput from "../components/UserInput"
import InputAxisHandler2D from "../components/InputAxisHandler2D"
import { enableScroll, disableScroll } from "../utils/EnableDisableScrolling"

export default class MouseInputSystem extends System {
  // Temp variables
  private _mouse: MouseInput
  public execute(): void {
    this.queries.axis.added.forEach(ent => {
      this._mouse = ent.getMutableComponent(MouseInput)
      document.addEventListener("mousemove", e => (this._mouse.moveHandler = this.moveHandler(e, ent)), false)
    })
    this.queries.buttons.added.forEach(ent => {
      this._mouse = ent.getMutableComponent(MouseInput)
      document.addEventListener("contextmenu", event => event.preventDefault())
      disableScroll()
      document.addEventListener(
        "mousedown",
        e => (this._mouse.downHandler = this.buttonHandler(e, ent, LifecycleValue.STARTED)),
        false
      )
      document.addEventListener(
        "mouseup",
        e => (this._mouse.upHandler = this.buttonHandler(e, ent, LifecycleValue.ENDED)),
        false
      )
    })
    this.queries.axis.removed.forEach(ent => {
      const mouse = ent.getComponent(MouseInput)
      if (mouse) document.removeEventListener("mousemove", mouse.upHandler)
    })
    this.queries.buttons.removed.forEach(ent => {
      document.removeEventListener("contextmenu", event => event.preventDefault())
      enableScroll()
      const mouse = ent.getComponent(MouseInput)
      if (mouse) document.removeEventListener("mousedown", mouse.downHandler)
      if (mouse) document.removeEventListener("mouseup", mouse.moveHandler)
    })
  }

  private moveHandler = (e: MouseEvent, entity: Entity): void => {
    entity.getComponent(InputAxisHandler2D).queue.add({
      axis: this._mouse.axisMap.mousePosition,
      value: { x: e.clientX, y: e.clientY }
    })
  }

  private buttonHandler = (e: MouseEvent, entity: Entity, value: LifecycleValue): void => {
    this._mouse = entity.getComponent(MouseInput)
    if (!this._mouse || this._mouse.actionMap[e.button] === undefined) return
    entity.getMutableComponent(InputActionHandler).queue.add({
      action: this._mouse.actionMap[e.button],
      value: value
    })
  }
}

MouseInputSystem.queries = {
  buttons: {
    components: [MouseInput, InputActionHandler, UserInput],
    listen: {
      added: true,
      removed: true
    }
  },
  axis: {
    components: [MouseInput, InputAxisHandler2D, UserInput],
    listen: {
      added: true,
      removed: true
    }
  }
}
