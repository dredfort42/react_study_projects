import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import CabinTable from './CabinTable';
import Modal from '../../ui/Modal';

export default function AddCabin() {
    return (
        <Modal>
            <Modal.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm />
            </Modal.Window>

            <Modal.Open opens="cabins-table">
                <Button>Show cabins table</Button>
            </Modal.Open>
            <Modal.Window name="cabins-table">
                <CabinTable />
            </Modal.Window>
        </Modal>
    );
}
// export default function AddCabin() {
//     const [isOpenModal, setIsOpenModal] = useState(false);
//     return (
//         <>
//             <Button onClick={() => setIsOpenModal((showForm) => !showForm)}>
//                 Add new cabin
//             </Button>
//             {isOpenModal && (
//                 <Modal onClose={() => setIsOpenModal(false)}>
//                     <CreateCabinForm
//                         onCloseModal={() => setIsOpenModal(false)}
//                     />
//                 </Modal>
//             )}
//         </>
//     );
// }
