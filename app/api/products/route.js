// app/api/users/route.js
import clientPromise from '@/lib/mongodb';



export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const url = new URL(request.url);
    const name = url.searchParams.get('name');

    if (!name) {
      // No name provided – return all products
      const items = await db.collection('products').find({}).toArray();
      return Response.json(items);
    }

    // Name provided – return only that item's price
    const item = await db.collection('products').findOne({ name });

    if (!item) {
      return new Response(JSON.stringify({ message: 'Item not found' }), {
        status: 404,
      });
    }

    return Response.json({ name: item.name, price: item.price });

  } catch (e) {
    console.error(e);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();

    const result = await db.collection('products').insertOne(body);

    return Response.json({ message: 'Item inserted', id: result.insertedId });
  } catch (e) {
    console.error(e);
    return new Response('Error inserting item', { status: 500 });
  }
}


export async function DELETE(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { name } = await request.json(); // expect { "name": "Item Name" }

    if (!name) {
      return new Response('Missing Name', { status: 400 });
    }
    
    const result = await db.collection('products').deleteOne({ name })


    if (result.deletedCount === 0) {
      return new Response('No document found to delete', { status: 404 });
    }

    return Response.json({ message: 'Item deleted', deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return new Response('Error deleting item', { status: 500 });
  }
}



export async function PATCH(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const body = await request.json();

    const { filter, update } = body;

    if (!filter || !update) {
      return new Response('Missing filter or update data', { status: 400 });
    }

    // Optional: Convert `_id` string to ObjectId if filter contains it
    if (filter._id) {
      filter._id = new ObjectId(filter._id);
    }

    const result = await db.collection('products').updateOne(filter, { $set: update });

    if (result.matchedCount === 0) {
    	return new Response(JSON.stringify({ message: 'No item matched the filter' }), {
    	status: 404,
    	});
   }

   return Response.json({
  	message: 'Update successful',
  	modifiedCount: result.modifiedCount,
    });

  } catch (e) {
    console.error('Update error:', e);
    return new Response('Error updating item', { status: 500 });
  }
}
