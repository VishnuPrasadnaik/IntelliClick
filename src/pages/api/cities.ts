import type { NextApiRequest, NextApiResponse } from 'next';
import { GEONAMES_API } from '../../constants/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { query, limit = 20, offset = 0 } = req.query;
    
    const whereClause = query ? `where=search(name,"${query}")` : '';
    const url = `${GEONAMES_API}?limit=${limit}&offset=${offset}&${whereClause}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    });
  }
}