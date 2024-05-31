import { Box, Fade, ImageList, ImageListItem, ImageListItemBar, useTheme } from '@mui/material';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { PlaceProps } from '@/types/attractions-restaurants';

type PlacePhotosProps = {
  placeData: PlaceProps;
};
export const PlacePhotos: React.FC<PlacePhotosProps> = ({ placeData }) => {
  const { ref, inView, entry } = useInView();
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (inView) {
      setShow(true);
    }
  }, [inView]);
  const [showItemBar, setShowItemBar] = useState(false);
  const handleItemBar = () => {
    setShowItemBar(true);
  };
  useEffect(() => {
    return () => {
      setShowItemBar(false);
    };
  }, []);
  // photo swipe
  useEffect(() => {
    let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
      gallery: '#place-gallery',
      children: 'a',
      showHideAnimationType: 'fade',
      initialZoomLevel: 'fit',
      pswpModule: () => import('photoswipe'),
      spacing: 0,
    });
    lightbox.init();
    return () => {
      lightbox && lightbox.destroy();
      // lightbox = null;
    };
  }, []);

  return (
    <Fade
      in={show}
      timeout={1100}
    >
      <ImageList
        ref={ref}
        sx={{
          bgcolor: 'white',
          width: '100%',
          height: 300,
          overflow: 'hidden',
          my: 0,
        }}
        id="place-gallery"
        variant="quilted"
        cols={4}
        rowHeight={148}
        className="pswp-gallery"
      >
        {/* slice for first five picture in image list */}
        {placeData.photos.slice(0, 5).map((item, index) => (
          <ImageListItem
            component={'a'}
            cols={index === 0 ? 2 : 1}
            rows={index === 0 ? 2 : 1}
            sx={{ borderRadius: 1, overflow: 'hidden', position: 'relative' }}
            href={item.imageUrl}
            key={item.imageUrl}
            target="_blank"
            rel="noreferrer"
            data-pswp-width="640px"
            data-pswp-height="480px"
          >
            <img
              src={item.imageUrl}
              alt={item.imageAlt}
              loading="lazy"
              onLoad={index === 4 ? handleItemBar : undefined}
            />
            {index === 4 && (
              <ImageListItemBar
                title={`Show All ${placeData.photos.length} Photos`}
                sx={{ height: 148, textAlign: 'center', opacity: +showItemBar }}
                actionIcon={
                  <Box
                    aria-label={'mask for show all button'}
                    sx={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  ></Box>
                }
              />
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </Fade>
  );
};
