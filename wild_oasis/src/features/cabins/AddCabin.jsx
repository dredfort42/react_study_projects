import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

export default function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <>
            <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
                Add new cabin
            </Button>
            {isOpenModal && (
                <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateCabinForm
                        onCloseModal={() => setIsOpenModal(false)}
                    />
                </Modal>
            )}
        </>
    );
}
