import { Modal, Form } from "antd";
import { SchemaField, TableData } from "../../type";
import EntryForm from "../Form/EntryForm";

interface Props {
  schema: SchemaField[];
  editEntry: TableData | null | undefined;
  handleModalCancel: () => void;
  handleEditRequest: (formData: TableData) => void;
  handleCreateRequest: (formData: TableData) => void;
}

const EntryFormModal: React.FC<Props> = ({
  schema,
  editEntry,
  handleModalCancel,
  handleEditRequest,
  handleCreateRequest,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title={editEntry ? "Edit Entry" : "Create Entry"}
      open={true}
      onCancel={handleModalCancel}
      footer={null}
      destroyOnClose={true}
    >
      <EntryForm
        form={form}
        schema={schema}
        editEntry={editEntry}
        onCancel={handleModalCancel}
        onFinish={editEntry ? handleEditRequest : handleCreateRequest}
      />
    </Modal>
  );
};

export default EntryFormModal;
