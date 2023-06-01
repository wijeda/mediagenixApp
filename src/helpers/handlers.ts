import { TableData } from "../type";
import { createEntry } from "../api/data";

export const handleCreate = (
  form: any,
  tableData: TableData[],
  setTableData: (data: TableData[]) => void,
  setIsModalOpen: (isOpen: boolean) => void
) => {
  form
    .validateFields()
    .then((values: any) => {
      console.log("Creating entry:", values);

      const { startDate, endDate, ...restFormValues } = values;

      const newEntry: TableData = {
        id: Math.random().toString(),
        startDate: startDate ? startDate.format("YYYY-MM-DD") : undefined,
        endDate: endDate ? endDate.format("YYYY-MM-DD") : undefined,
        ...restFormValues,
      };

      console.log("startDate");
      console.log(startDate);

      createEntry(newEntry).then((response: TableData) => {
        setTableData([...tableData, response]);
        setIsModalOpen(false);
        form.resetFields();
      });
    })
    .catch((error: Error) => {
      console.error("Validation error:", error);
    });
};

export const handleCancel = (setIsModalOpen: (isOpen: boolean) => void) => {
  setIsModalOpen(false);
};
