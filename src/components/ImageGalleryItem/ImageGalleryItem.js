import PropTypes from 'prop-types';
export default function ImageGalleryItem({ image, alt, largeImage, onClick }) {
  return (
    <li className="ImageGalleryItem" onClick={() => onClick(largeImage, alt)}>
      <img src={image} alt={alt} className="ImageGalleryItem-image" />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  alt: PropTypes.string,
  largeImage: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
