<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'total',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function products()
    {
        return $this->hasManyThrough(Product::class, OrderItem::class);
    }

    public function calculateTotal()
    {
        $total = $this->orderItems->sum(function ($item) {
            return $item->quantity * $item->price;
        });

        $this->total = $total;
        $this->save();

        return $total;
    }
}
