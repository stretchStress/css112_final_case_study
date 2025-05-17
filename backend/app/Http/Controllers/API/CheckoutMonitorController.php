<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class CheckoutMonitorController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('orderItems.product');

        if ($request->has('date')) {
            $query->whereDate('created_at', $request->date);
        }

        return $query->get();
    }

    public function show(Order $order)
    {
        return $order->load('orderItems.product');
    }
}

