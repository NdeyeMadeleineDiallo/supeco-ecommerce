<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        // Base commande
        'user_id',
        'total',
        'status',

        // Livraison
        'shipping_name',
        'shipping_phone',
        'shipping_city',
        'shipping_address',
        'shipping_note',

        // Paiement
        'payment_method',
        'payment_status',
        'payment_ref',
    ];

    /* =======================
     | Relations
     ======================= */

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
