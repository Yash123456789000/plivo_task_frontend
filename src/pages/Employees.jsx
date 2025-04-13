import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { employeesGrid } from '../data/dummy';
import { Button, Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import ApiModal from '../components/Modal/ApiModal';

const Employees = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  const apiData = JSON.parse(localStorage.getItem('apiData'));

  const { currentColor, currentMode } = useStateContext();
  const [isApiModalOpen, setIsApiModalOpen] = React.useState(false);

  const sortSettings = {
    columns: [
      { field: 'lastUpdated', direction: 'Descending' } // sort newest to oldest
    ]
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Services" title="APIs" />
      <div className="mb-5 w-[11%]" onClick={() => {setIsApiModalOpen(true);}}>
        <Button
          color="white"
          bgColor={currentColor}
          text="Add API"
          borderRadius="10px"
        />
      </div>
      <ApiModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
      />
      <GridComponent
        dataSource={apiData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        sortSettings={sortSettings}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent>
    </div>
  );
};
export default Employees;
