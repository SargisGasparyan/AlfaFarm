//? Base class to add some helper properties and methods to React.Component

import * as React from 'react';

class HelperComponent<Props, State> extends React.Component<Props, State> {

  protected mounted = true;

  public componentWillUnmount() { this.mounted = false; }

  public safeSetState(object: object | ((prev: State) => State), callback?: () => void) {
    this.mounted && this.setState(object, callback);
  }
}

export default HelperComponent;