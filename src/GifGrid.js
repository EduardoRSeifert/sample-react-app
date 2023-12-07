import React, { useState, useEffect } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

function GifGrid({ animal, tvShow, disneyCharacter, country }) {
  const [maxGifWidth, setMaxGifWidth] = useState(200);

  useEffect(() => {
    const allGifs = [animal, tvShow, disneyCharacter, country].flatMap((data) => data.data || []);
    const maxWidth = Math.max(...allGifs.map((gif) => gif.images.fixed_height.width));

    setMaxGifWidth(maxWidth);
  }, [animal, tvShow, disneyCharacter, country]);

  const GifsCell = (props) => {
    const fieldData = props.dataItem[props.field];

    if (!fieldData || !fieldData.data) {
      return null;
    }

    return (
      <td>
        {fieldData.data.map((gif) => (
          <div key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        ))}
      </td>
    );
  };

  return (
    <div>
      <h2>Gif Grid</h2>
      <Grid data={[{ animal, tvShow, disneyCharacter, country }]}>
        <Column field="animal" title="Animal" cell={GifsCell} width={`${maxGifWidth}px`} />
        <Column field="tvShow" title="TV Show" cell={GifsCell} width={`${maxGifWidth}px`} />
        <Column field="disneyCharacter" title="Disney Character" cell={GifsCell} width={`${maxGifWidth}px`} />
        <Column field="country" title="Country" cell={GifsCell} width={`${maxGifWidth}px`} />
      </Grid>
    </div>
  );
}

export default GifGrid;
