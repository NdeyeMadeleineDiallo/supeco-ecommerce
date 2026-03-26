<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class OrderPlaced extends Notification
{
    use Queueable;

    public function __construct(public Order $order) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): MailMessage
    {
        $waveNumber = env('WAVE_NUMBER', '77 xxx xx xx');
        $omNumber   = env('ORANGE_MONEY_NUMBER', '78 xxx xx xx');

        $pm = $this->order->payment_method;
        $methodLabel = $pm === 'om' ? 'Orange Money' : ($pm === 'paypal' ? 'PayPal' : 'Wave');

        $ref = $this->order->payment_ref ?? ('SUPECO-' . strtoupper(substr(md5($this->order->id), 0, 6)));

        $payLine = 'Paiement : ' . $methodLabel . ' | Référence : ' . $ref;

        if ($pm === 'wave') {
            $payLine .= ' | Payer au : ' . $waveNumber;
        } elseif ($pm === 'om') {
            $payLine .= ' | Payer au : ' . $omNumber;
        }

        return (new MailMessage)
            ->subject('SUPECO — Commande enregistrée #' . $this->order->id)
            ->greeting('Bonjour ' . ($this->order->shipping_name ?? $notifiable->name) . ',')
            ->line('Votre commande a bien été enregistrée.')
            ->line('Total : ' . number_format($this->order->total, 0, ',', ' ') . ' F')
            ->line($payLine)
            ->line('Livraison : ' . ($this->order->shipping_city ?? '-') . ' — ' . ($this->order->shipping_address ?? '-'))
            ->action('Voir ma commande', route('orders.show', $this->order))
            ->line('Merci pour votre confiance.');
    }
}
