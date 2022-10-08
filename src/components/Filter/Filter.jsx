import PropTypes from 'prop-types';
import { Box } from 'components/Box';

import { Input } from 'components/ContactForm/ContactForm.styled';

const Filter = ({ filter, handleInputName }) =>
    <Box
        display="flex"
        flexDirection="column"
        p={4}
        alignItems="center"
    >
        <label> Find contacts by name
            <Input
                type="text"
                name="filter"
                value={filter}
                onChange={handleInputName}
            />
        </label>
    </Box>
Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    handleInputName: PropTypes.func.isRequired,
};

export default Filter;