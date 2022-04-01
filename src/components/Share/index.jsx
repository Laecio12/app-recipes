import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import ShareBtn from './styles';
import copyToClipboard from '../../utils/copyLink';

const Share = ({ id, type }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyLink = () => {
    if (type === 'cocktails') copyToClipboard(`http://localhost:3000/drinks/${id}`);
    else copyToClipboard(`http://localhost:3000/foods/${id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, +'2000');
  };

  return (
    <ShareBtn
      data-testid="share-btn"
      onClick={ copyLink }
    >
      {isCopied ? 'Link copied!' : <img src={ shareIcon } alt="Share" />}
    </ShareBtn>
  );
};

Share.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Share;
