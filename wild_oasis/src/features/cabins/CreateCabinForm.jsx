import Input from '../../ui/Input';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
    const { id: editId, ...editValues } = cabinToEdit;
    const isEdit = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEdit ? editValues : {},
    });
    const { errors } = formState;

    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const isWorking = isCreating || isEditing;

    function onSubmit(data) {
        const image =
            typeof data.image_url === 'string'
                ? data.image_url
                : data.image_url[0];

        if (isEdit) {
            editCabin(
                {
                    newCabinData: { ...data, image_url: image },
                    id: editId,
                },
                {
                    onSuccess: (data) => reset(),
                }
            );
        } else {
            createCabin(
                { ...data, image_url: image },
                {
                    onSuccess: (data) => reset(),
                }
            );
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Cabin name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register('name', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors?.max_capacity?.message}
            >
                <Input
                    type="number"
                    id="max_capacity"
                    disabled={isWorking}
                    {...register('max_capacity', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Capacity should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Regular price"
                error={errors?.regular_price?.message}
            >
                <Input
                    type="number"
                    id="regular_price"
                    disabled={isWorking}
                    {...register('regular_price', {
                        required: 'This field is required',
                        min: {
                            value: 1,
                            message: 'Regular price should be at least 1',
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register('discount', {
                        required: 'This field is required',
                        validate: (value) =>
                            value <= getValues().regular_price ||
                            'Discount should be less than regular price',
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register('description', {
                        required: 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors?.image_url?.message}>
                <FileInput
                    id="image_url"
                    disabled={isWorking}
                    accept="image/*"
                    {...register('image_url', {
                        required: isEdit ? false : 'This field is required',
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button disabled={isWorking} variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEdit ? 'Edit cabin' : 'Create new cabin'}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
