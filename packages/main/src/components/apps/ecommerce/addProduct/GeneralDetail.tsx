
import { Label, TextInput } from "flowbite-react";
import CardBox from "src/components/shared/CardBox";
import TiptapEdit from "src/views/forms/from-tiptap/TiptapEdit";



const GeneralDetail = () => {


  return (
    <>
      <CardBox>
        <h5 className="card-title mb-4">General</h5>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="prednm" value="Product Name" />
            <span className="text-error ms-1">*</span>
          </div>
          <TextInput
            id="prednm"
            type="text"
            sizing="md"
            className="form-control"
            placeholder="Product Name"
          />
          <small className="text-xs text-darklink dark:text-bodytext">
            A product name is required and recommended to be unique.
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc" value="Description" />
          </div>
           <TiptapEdit/>
          <small className="text-xs text-darklink dark:text-bodytext">
            Set a description to the product for better visibility.
          </small>
        </div>
      </CardBox>
    </>
  );
};

export default GeneralDetail;
