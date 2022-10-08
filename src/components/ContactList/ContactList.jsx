import PropTypes from 'prop-types';
import { Box } from 'components/Box';
 import { Button } from '../ContactForm/ContactForm.styled';

const ContactList = ({ contacts, OnDeleteContact }) => {
    return (
        <Box
            as="ul"
            display="flex"
            flexDirection="column"
            p={4}
            alignItems="center"
        >
            {contacts.map((({ id, name, number }) => {
                return (
                    <li key={id}>
                        {name}: {number}
                        <Button onClick={() =>
                            OnDeleteContact(id)
                        }>Удалить</Button>
                    </li>
            
                )
            }))}
        </Box>)
};
    
ContactList.propTypes = {
    OnDeleteContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        }),
    ),
};

export default ContactList;