import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Selection, Search, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { contextMenuItems, ordersGrid } from '../data/dummy';
import { Button, Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import WebsiteModal from '../components/Modal/WebsiteModal';

const Orders = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const toolbarOptions = ['Search', 'Delete'];
  const selectionsettings = { persistSelection: true };
  const websiteData = JSON.parse(localStorage.getItem('websiteData'));
  const { currentColor, currentMode } = useStateContext();
  const [isWebsiteModalOpen, setIsWebsiteModalOpen] = React.useState(false);

  const sortSettings = {
    columns: [
      { field: 'lastUpdated', direction: 'Descending' } // sort newest to oldest
    ]
  };
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Services" title="Websites" />
      <div className="mb-5 w-[11%]" onClick={() => {setIsWebsiteModalOpen(true);}}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Add Website"
          borderRadius="10px"
        />
      </div>
      <WebsiteModal
        isOpen={isWebsiteModalOpen}
        onClose={() => setIsWebsiteModalOpen(false)}
      />
      <GridComponent
        id="gridcomp"
        dataSource={websiteData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={contextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
        selectionSettings={selectionsettings}
        sortSettings={sortSettings}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Search, Selection]} />
      </GridComponent>
    </div>
  );
};
export default Orders;
