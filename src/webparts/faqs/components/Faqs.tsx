import * as React from 'react';
import styles from './Faqs.module.scss';
import { IFaqsProps } from './IFaqsProps';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import AccordionDisplay from '../../faqs/components/MyAccordionTemplate';
import { escape } from '@microsoft/sp-lodash-subset';
import "./styles.scss";

export interface IFaqsState {
  answers?: any;
  searchValue?: any;
  selectedValue?: any;
}

export default class Faqs extends React.Component<IFaqsProps, IFaqsState> {

  public constructor(props) {
    super(props);   
    this.state = {
      answers: [],
      searchValue: '',
      selectedValue: 0
    };
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
  }

  public handleDropdownChange(e) {
    this.setState({ selectedValue: e.target.value });
  }

  public componentWillMount() {
    this.getListData();
  }

  public async getListData() {
    const answers: any[] = await sp.web.lists.getByTitle("FAQs").items.get();
    this.setState({answers: answers});
  }

  public handleSearch = (e) => {
    this.setState({searchValue: e.target.value.toLowerCase()});
  }

  public render(): React.ReactElement<IFaqsProps> {
    console.log(this.state);
    const { answers, searchValue, selectedValue } = this.state;
    return (
      <div className={ styles.faqs }>
        <div className={ styles.container }>
          <p className={ styles.title }>{escape(this.props.description)}</p>
          <div className={ styles.filters }>
            <div>
              <label>Search:</label>
              <input type="text" onChange={(event) =>this.handleSearch(event)} />
            </div>
            <div>
            <label>Category:</label>
            <select onChange={this.handleDropdownChange} disabled={this.props.children !== 0 ? false : true}>
              <option value="0">All</option>
              <option value="5">Mercedes</option>
              <option value="1">BMW</option>
              <option value="2">Maserati</option>
              <option value="3">Infinity</option>
              <option value="4">Audi</option>
            </select> 
            </div>
          </div>
          <AccordionDisplay answers={answers} searchValue={searchValue} selectedValue={selectedValue}/>
        </div>
      </div>
    );
  }
  
}
