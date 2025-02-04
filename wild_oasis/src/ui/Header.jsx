import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import ButtonIcon from './ButtonIcon';
import UserAvatar from '../features/authentication/UserAvatar';
import { useNavigate } from 'react-router-dom';

const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);

    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
`;

export default function Header() {
    const navigate = useNavigate();

    return (
        <StyledHeader>
            <ButtonIcon onClick={() => navigate('/account')}>
                {/* <HiOutlineUser /> */}
                <UserAvatar />
            </ButtonIcon>
            <HeaderMenu />
        </StyledHeader>
    );
}
