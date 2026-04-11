import { NextRequest, NextResponse } from 'next/server';

// AI-powered listing generation endpoint
// In production, this connects to OpenAI/Anthropic API
// For the prototype, we use intelligent template-based generation
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { action, product } = body;

  if (action === 'generate_listing') {
    // Generate AI listing content based on product data
    const conditionMap: Record<string, string> = {
      new: 'Brand new, never used',
      like_new: 'Like new condition, minimal use',
      good: 'Good condition with normal wear',
      fair: 'Fair condition, fully functional',
      poor: 'Used condition, sold as-is',
      refurbished: 'Professionally refurbished',
    };

    const conditionText = conditionMap[product.condition] || 'Good condition';
    const pricePoint = product.retail_price;

    // Generate title
    const title = `${product.name}${product.condition !== 'new' ? ` - ${conditionText}` : ''} | Great Price`;

    // Generate description
    const description = `${product.name}

${conditionText}. ${product.description || 'Well-maintained and ready for use.'}

Key Details:
${product.sku ? `• SKU: ${product.sku}` : ''}
• Condition: ${conditionText}
• Price: $${pricePoint.toFixed(2)}
${product.tags?.length ? `• Tags: ${product.tags.join(', ')}` : ''}

Local pickup available. Cash, card, or digital payment accepted.

Message me with any questions! Serious buyers only.`;

    // Suggest competitive price (10-15% below retail for used)
    let suggestedPrice = pricePoint;
    if (product.condition !== 'new') {
      const discountMap: Record<string, number> = {
        like_new: 0.85,
        good: 0.70,
        fair: 0.55,
        poor: 0.40,
        refurbished: 0.75,
      };
      suggestedPrice = Math.round(pricePoint * (discountMap[product.condition] || 0.7) * 100) / 100;
    }

    return NextResponse.json({
      title,
      description,
      suggested_price: suggestedPrice,
    });
  }

  if (action === 'demand_forecast') {
    // Mock demand forecast based on product category
    const forecast = {
      demand_level: 'high',
      confidence: 0.78,
      recommended_price_range: {
        min: product.retail_price * 0.8,
        max: product.retail_price * 1.1,
      },
      best_time_to_list: 'Weekend mornings (Sat-Sun 8-11 AM)',
      estimated_days_to_sell: Math.floor(Math.random() * 14) + 3,
      similar_listings_avg_price: product.retail_price * 0.9,
      insights: [
        'Power tools and business equipment are trending up 15% on Facebook Marketplace in Missouri',
        'Complete toolkits sell 2.3x faster than individual items',
        'Items priced $10-$200 have the fastest turnover on Marketplace',
      ],
    };

    return NextResponse.json(forecast);
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}
