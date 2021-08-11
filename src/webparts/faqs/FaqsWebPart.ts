import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'FaqsWebPartStrings';
import Faqs from './components/Faqs';
import { IFaqsProps } from './components/IFaqsProps';

import { setup as pnpSetup } from "@pnp/common";

export interface IFaqsWebPartProps {
  description: string;
}

export default class FaqsWebPart extends BaseClientSideWebPart<IFaqsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IFaqsProps> = React.createElement(
      Faqs,
      {
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
