#!/bin/bash

echo "🏥 Saha HMS - Automated Setup Script"
echo "=========================================="
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Create .env files if they don't exist
echo "📝 Setting up environment files..."

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from .env.example"
else
    echo "ℹ️  backend/.env already exists"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo "✅ Created frontend/.env from .env.example"
else
    echo "ℹ️  frontend/.env already exists"
fi

echo ""
echo "🐳 Starting Docker containers..."
docker-compose up -d

echo ""
echo "⏳ Waiting for MySQL to be ready..."
sleep 10

echo ""
echo "🗄️  Running database migrations..."
docker-compose exec -T backend npx prisma migrate deploy

echo ""
echo "🌱 Seeding database with sample data..."
docker-compose exec -T backend npx prisma db seed 2>/dev/null || echo "ℹ️  Seed script not found, skipping..."

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "🌐 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8100"
echo "   API Health: http://localhost:8100/health"
echo ""
echo "📊 Default Admin Credentials:"
echo "   Email: admin@vitalcore.com"
echo "   Password: admin123"
echo ""
echo "🛠️  Useful Commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop: docker-compose down"
echo "   Restart: docker-compose restart"
echo "   Database Studio: docker-compose exec backend npx prisma studio"
echo ""
echo "📚 Documentation: See README.md for more information"
echo ""
