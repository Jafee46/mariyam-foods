import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Order Notification
  app.post("/api/notify-owner", (req, res) => {
    const { orderDetails, customerAddress } = req.body;
    
    console.log("--- NEW ORDER NOTIFICATION ---");
    console.log(`To: mariyamfoods.owner@gmail.com`);
    console.log(`Subject: New Order from ${customerAddress.name}`);
    console.log(`Customer Phone: ${customerAddress.phone}`);
    console.log(`Shipping Address: ${customerAddress.street}, ${customerAddress.city} - ${customerAddress.pincode}`);
    console.log(`Order Total: ₹${orderDetails.total}`);
    console.log("------------------------------");

    // In a real production app, you would use a service like Resend, SendGrid, or Nodemailer here.
    // Example (pseudo-code):
    // await emailService.send({
    //   to: 'mhxdjafee46@gmail.com',
    //   subject: 'New Order Received',
    //   text: `New order from ${customerAddress.name}...`
    // });

    res.json({ 
      success: true, 
      message: "Notification sent to owner's Gmail (Simulated in logs)" 
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
