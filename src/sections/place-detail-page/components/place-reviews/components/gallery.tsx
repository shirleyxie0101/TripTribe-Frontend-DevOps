import { Box, Card, CardMedia, Link, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import React, { FC, useEffect } from 'react';

import { ReviewPhoto } from '@/types/review';

const DEFAULT_THUMBNAIL_LIMIT = 5;
const IMAGE_MAX_HEIGHT = '960px';
const IMAGE_MAX_WIDTH = '1280px';
interface GalleryProps {
  galleryID: string;
  images: ReviewPhoto[];
}

const Gallery: FC<GalleryProps> = ({ galleryID, images }) => {
  // if imageCount >= DEFAULT_THUMBNAIL_LIMIT, it will show (thumbnailLimit-1) thumbnail plus one button that shows how many images are hidden
  // otherwise it will show imageCount of thumbnails
  const imageCount = images.length;

  // photoswipe
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: '#' + galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
      spacing: 0,
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <Box
      className="pswp-gallery"
      id={galleryID}
      sx={{ display: 'flex', justifyContent: 'flex-start' }}
      data-testid="gallery-box"
    >
      {/* if imageCount < DEFAULT_THUMBNAIL_LIMIT, show all the thumbnails, else show (DEFAULT_THUMBNAIL_LIMIT-1) of thumbnails */}
      {(imageCount < DEFAULT_THUMBNAIL_LIMIT
        ? images
        : images.slice(0, DEFAULT_THUMBNAIL_LIMIT - 1)
      ).map((image, index) => (
        <Link
          href={image.imageUrl}
          key={galleryID + '-' + index}
          target="_blank"
          rel="noreferrer"
          data-pswp-width={IMAGE_MAX_WIDTH}
          data-pswp-height={IMAGE_MAX_HEIGHT}
        >
          <Card
            key={index}
            elevation={0}
            sx={{
              height: '40px',
              width: '40px',
              mr: 0.5,
            }}
          >
            <CardMedia
              image={image.imageUrl}
              sx={{ height: '100%' }}
            />
          </Card>
        </Link>
      ))}

      {/* if imageCount >= DEFAULT_THUMBNAIL_LIMIT, the last thumbnail shows how many hidden images at the end */}
      {imageCount >= DEFAULT_THUMBNAIL_LIMIT && (
        <Link
          href={images[DEFAULT_THUMBNAIL_LIMIT - 1].imageUrl}
          key={galleryID + '-' + (DEFAULT_THUMBNAIL_LIMIT - 1)}
          target="_blank"
          rel="noreferrer"
          data-pswp-width={IMAGE_MAX_WIDTH}
          data-pswp-height={IMAGE_MAX_HEIGHT}
        >
          <Card
            key={DEFAULT_THUMBNAIL_LIMIT - 1}
            elevation={0}
            sx={{
              position: 'relative',
              height: '40px',
              width: '40px',
              mr: 0.5,
              bgcolor: grey[200],
            }}
          >
            <Typography
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              color="text.secondary"
              fontSize="12px"
            >
              + {imageCount - DEFAULT_THUMBNAIL_LIMIT + 1}
            </Typography>
          </Card>
        </Link>
      )}

      {/* imageCount > DEFAULT_THUMBNAIL_LIMIT, map the hidden images without thumbnails */}
      {imageCount > DEFAULT_THUMBNAIL_LIMIT &&
        images.slice(DEFAULT_THUMBNAIL_LIMIT, imageCount).map((image, index) => (
          <Link
            href={image.imageUrl}
            key={galleryID + '-' + index}
            target="_blank"
            rel="noreferrer"
            data-pswp-width={IMAGE_MAX_WIDTH}
            data-pswp-height={IMAGE_MAX_HEIGHT}
          ></Link>
        ))}
    </Box>
  );
};

export default Gallery;
