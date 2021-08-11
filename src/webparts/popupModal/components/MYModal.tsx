import * as React from 'react';
import { useId, useBoolean } from '@fluentui/react-hooks';
import {
  getTheme,
  mergeStyleSets,
  FontWeights,
  Modal,
  IIconProps,
  IStackProps,
} from '@fluentui/react';
import { IconButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult } from "@pnp/sp/items";
import "./styles.scss";

const logo: any = require('../../assets/nhs.png');

export const MYModal = (myprops) => {

  const [state, setState] = React.useState({
    qname: ""
  });

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
  const [isPopup, setisPopup] = React.useState(true);
  const titleId = useId('Got a question about the programme?');

  React.useEffect(() => {
    showModal();
  }, [isPopup]);

  function ExitHandler() {
    hideModal();
    setisPopup(current => !current);
    myprops.handler();
  }

  const postListData = async event => { 
    event.preventDefault();
    const question: IItemAddResult = await sp.web.lists.getByTitle("Questions").items.add({
      Question: state.qname,
    });
    ExitHandler();
  };

  // FluentUI config
const cancelIcon: IIconProps = { iconName: 'Cancel' };
const theme = getTheme();
const contentStyles = mergeStyleSets({
  para: {
    'max-width': '450px',
    color: '#005EB8'
  },
  input: {
    width: '100%',
    'border-radius': '4px',
    border: 'none',
    height: '100px',
    outline: 'none',
    padding: '4px 7px',
    'box-sizing': 'border-box',
    color: '#535353'
  },
  container: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'stretch',
    background: 'rgb(240 240 240)',
    'border-radius': '25px',
    'border': '2px solid #00a9ce'
  },
  header: [
    // eslint-disable-next-line deprecation/deprecation
    theme.fonts.xLarge,
    {
      flex: '1 1 auto',
      borderTop: '4px solid ${theme.palette.themePrimary}',
      color: '#005EB8',
      display: 'flex',
      alignItems: 'center',
      fontWeight: FontWeights.semibold,
      padding: '12px 12px 14px 24px',
    },
  ],
  body: {
    flex: '4 4 auto',
    padding: '0 24px 24px 24px',
    overflowY: 'hidden',
    selectors: {
      p: { margin: '14px 0' },
      'p:first-child': { marginTop: 0 },
      'p:last-child': { marginBottom: 0 },
    },
  },
  button: {
    'color': '#fff',
    'background': '#00a9ce',
    'border': 'none',
    'border-radius': '5px',
    'padding': '7px 25px',
    'margin-top': '14px',
    cursor: 'pointer',
    'margin-bottom':'-7px'
  },
  buttonHoverd: {
    'color': '#fff',
    'background': 'red',
  }
});
const stackProps: Partial<IStackProps> = {
  horizontal: true,
  tokens: { childrenGap: 40 },
  styles: { root: { marginBottom: 20 } },
};
const iconButtonStyles: Partial<IButtonStyles> = {
  root: {
    color: '#005EB8',
    marginLeft: 'auto',
    marginTop: '-22px',
    marginRight: '2px',
  },
  rootHovered: {
    color: '#005EB8',
    background: '#fff',
    marginTop: '-22px'
  },
};

  return (
    <div>
      <Modal
        titleAriaId={titleId}
        isOpen={isModalOpen}
        onDismiss={ExitHandler}
        isBlocking={true}
        containerClassName={contentStyles.container}
      >
        <div className={contentStyles.header}>
        <img src={logo} width={100} /><span id={titleId}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Microsoft 365 Programme&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <IconButton
            styles={iconButtonStyles}
            iconProps={cancelIcon}
            ariaLabel="Close popup modal"
            onClick={ExitHandler}
          />
        </div>
        <div className={contentStyles.body}>
          <p className={contentStyles.para}>Enter your question below and a member of our team will respond as soon as possible.</p>
          <form onSubmit={postListData}>
            <textarea 
              className={contentStyles.input}
              name="qname"
              value={state.qname}
              onChange={handleChange}
              placeholder="Type here..."
            />
            <br/>
            <button type="submit" className={contentStyles.button} disabled={state.qname.length !== 0 ? false : true}>Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );

};