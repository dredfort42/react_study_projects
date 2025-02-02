import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
    const {
        isLoading,
        settings: {
            min_booking_length,
            max_booking_length,
            max_guests_per_booking,
            breakfast_price,
        } = {},
    } = useSettings();

    const { isUpdating, updateSetting } = useUpdateSetting();

    if (isLoading) {
        return <Spinner />;
    }

    function handleUpdate(e, old_value, field) {
        const { value } = e.target;

        if (!value || Number(value) === old_value) return;

        updateSetting({
            [field]: value,
        });
    }

    return (
        <Form>
            <FormRow label="Minimum nights for booking">
                <Input
                    type="number"
                    id="min_booking_length"
                    defaultValue={min_booking_length}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdate(
                            e,
                            min_booking_length,
                            'min_booking_length'
                        )
                    }
                />
            </FormRow>
            <FormRow label="Maximum nights for booking">
                <Input
                    type="number"
                    id="max_booking_length"
                    defaultValue={max_booking_length}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdate(
                            e,
                            max_booking_length,
                            'max_booking_length'
                        )
                    }
                />
            </FormRow>
            <FormRow label="Maximum guests in one booking">
                <Input
                    type="number"
                    id="max_guests_per_booking"
                    defaultValue={max_guests_per_booking}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdate(
                            e,
                            max_guests_per_booking,
                            'max_guests_per_booking'
                        )
                    }
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast_price"
                    defaultValue={breakfast_price}
                    disabled={isUpdating}
                    onBlur={(e) =>
                        handleUpdate(e, breakfast_price, 'breakfast_price')
                    }
                />
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
