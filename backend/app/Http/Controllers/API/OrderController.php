<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem; 
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $total = 0;

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            if ($product->stock < $item['quantity']) {
                return response()->json(['message' => "Not enough stock for {$product->name}"], 400);
            }
            $total += $product->price * $item['quantity'];
        }

        $order = Order::create([
            'user_id' => auth()->id(),
            'total' => $total,
        ]);

        foreach ($validated['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $product->decrement('stock', $item['quantity']);

            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        return $order->load('orderItems');
    }
}


