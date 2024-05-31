import { StaticMapProps, staticMapUrlGenerator } from '@/utils/static-map-url-generator';

describe('staticMapUrlGenerator', () => {
  it('should generate correct url', () => {
    const props: StaticMapProps = {
      mapCenter: { lat: -42.87936, lng: 147.32941 }, // Hobart
      zoom: 12,
      width: 888,
      height: 777,
    };
    const url = staticMapUrlGenerator(props);
    expect(url).toBe(
      'https://api.mapbox.com/styles/v1/triptribe/clp18ys6w00cb01pq0t4c029g/static/147.32941,-42.87936,12,0/888x777?access_token=pk.eyJ1IjoidHJpcHRyaWJlIiwiYSI6ImNscDB0bm9sbzBibXgya21qczY4ZDhsZXUifQ.MYlQE4YsEt5Z-tnHxFE9NA'
    );
  });
});
