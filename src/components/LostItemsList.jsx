
import { useEffect, useState } from 'react';
import axios from 'axios';

function LostItemsList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/lost-items');
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h2>Lost Items</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {items.map((item, index) => (
          <div key={index} style={{ border: '1px solid gray', padding: '1rem' }}>
            <p>{item.name}</p>
            <img src={`http://localhost:5000${item.image_url}`} alt={item.name} width="150" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LostItemsList;
