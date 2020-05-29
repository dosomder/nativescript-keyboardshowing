declare module "nativescript-keyboardshowing" {
  /**
   * Returns if the keyboard is showing.
   */
  export function isShowing(): boolean;

  /**
   * Refresh the keyboard listeners in case tracking is lost.
   */
  export function refreshListener(): void;

  /**
   * Add a new observer for the keyboard state.
   * @param callback Callback to call when the state of the keyboard changes
   */
  export function addNotifyKeyboardAction(callback: (state: any) => void): void;

  /**
   * Remove a previously registered observer.
   * @param callback Callback to remove
   */
  export function removeNotifyKeyboardAction(
    callback: (state: any) => void
  ): void;
}
