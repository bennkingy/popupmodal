import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PopupModalWebPartStrings';
import PopupModal from './components/PopupModal';
import { IPopupModalProps } from './components/IPopupModalProps';

import { WebPartContext } from "@microsoft/sp-webpart-base";

import { setup as pnpSetup } from "@pnp/common";


export interface IPopupModalWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class PopupModalWebPart extends BaseClientSideWebPart<IPopupModalWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPopupModalProps> = React.createElement(
      PopupModal,
      {
        context: this.context,
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      // other init code may be present
      pnpSetup({
        spfxContext: this.context
      });
    });
  }  

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
