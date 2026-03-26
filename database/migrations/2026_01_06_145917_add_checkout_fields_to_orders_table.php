<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Infos livraison
            if (!Schema::hasColumn('orders', 'shipping_name')) {
                $table->string('shipping_name', 120)->nullable()->after('user_id');
            }
            if (!Schema::hasColumn('orders', 'shipping_phone')) {
                $table->string('shipping_phone', 30)->nullable()->after('shipping_name');
            }
            if (!Schema::hasColumn('orders', 'shipping_city')) {
                $table->string('shipping_city', 80)->nullable()->after('shipping_phone');
            }
            if (!Schema::hasColumn('orders', 'shipping_address')) {
                $table->string('shipping_address', 255)->nullable()->after('shipping_city');
            }
            if (!Schema::hasColumn('orders', 'shipping_note')) {
                $table->text('shipping_note')->nullable()->after('shipping_address');
            }

            // Paiement
            if (!Schema::hasColumn('orders', 'payment_method')) {
                $table->string('payment_method', 20)->default('wave')->after('status'); // wave|om|paypal
            }
            if (!Schema::hasColumn('orders', 'payment_status')) {
                $table->string('payment_status', 30)->default('pending')->after('payment_method'); // pending|paid
            }
            if (!Schema::hasColumn('orders', 'payment_ref')) {
                $table->string('payment_ref', 120)->nullable()->after('payment_status'); // ref transaction ou paypal id
            }
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $columns = [
                'shipping_name','shipping_phone','shipping_city','shipping_address','shipping_note',
                'payment_method','payment_status','payment_ref'
            ];

            foreach ($columns as $col) {
                if (Schema::hasColumn('orders', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
