<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|string',
        ]);

        return Product::create($validated);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|string',
        ]);

        $product->update($validated);

        return $product;
    }

    public function destroy(Product $product)
    {
        if ($product->orderItems()->exists()) {
            return response()->json(['message' => 'Cannot delete product with existing orders'], 400);
        }

        $product->delete();
        return response()->json(['message' => 'Deleted']);
    }

    public function search(Request $request)
    {
        return Product::where('name', 'like', '%'.$request->query('q').'%')->get();
    }
    
    public function orderItems()
    {
    return $this->hasMany(OrderItem::class);
    }

}

