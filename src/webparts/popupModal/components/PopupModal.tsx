import * as React from 'react';
import styles from './PopupModal.module.scss';
import { IPopupModalProps } from './IPopupModalProps';
import {MYModal} from './MYModal';
import "./styles.scss";

interface IPopupState { 
  callchildcomponent:boolean;
}

export default class PopupModal extends React.Component<IPopupModalProps,  IPopupState> {

  constructor(props: IPopupModalProps, state: IPopupState) {
    super(props);
    this.state = {
      callchildcomponent:false
    };
    this.handler = this.handler.bind(this);
    this.Buttonclick = this.Buttonclick.bind(this);
  }

  public handler() {
    this.setState({
      callchildcomponent: false
    });
  }

  private Buttonclick(e) {
    e.preventDefault();
    this.setState({ callchildcomponent:true });
  }

  public render(): React.ReactElement<IPopupModalProps> {
    return (
      <div>
        <div onClick={(e) =>this.Buttonclick(e)} className={styles.buttonImage}></div>
        { this.state.callchildcomponent && <MYModal myprops={this.state} handler = {this.handler}/>}
      </div>
    );
  }

}