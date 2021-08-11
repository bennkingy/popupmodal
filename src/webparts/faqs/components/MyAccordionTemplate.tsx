import * as React from 'react';
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion"; 

const AccordionDisplay = ({answers, searchValue, selectedValue}) => {

  let renderAccordion;
  
  if(selectedValue == 0) {
    renderAccordion = answers
      .filter(answer => answer.Question.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
        .map(answer=> {
          console.log(answer);
          return (
            <Accordion title={answer.Question} defaultCollapsed={true} className={"itemCell"} key={answer.ID}>  
              <div className={"itemContent"}>  
                <div className={"itemResponse"}>
                <p>{answer.Response}</p>
                </div>  
              </div>  
            </Accordion>  
          );
        });
  } else {
    renderAccordion = answers
    .filter(answer => answer.Question.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
    .filter(answer => answer.CategoryId == selectedValue)
      .map(answer=> {
        console.log(answer);
        return (
          <Accordion title={answer.Question} defaultCollapsed={true} className={"itemCell"} key={answer.ID}>  
            <div className={"itemContent"}>  
              <div className={"itemResponse"}>
              <p>{answer.Response}</p>
              </div>  
            </div>  
          </Accordion>  
        );
      });

  }

  return renderAccordion;

};

export default AccordionDisplay;