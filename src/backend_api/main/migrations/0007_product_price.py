# Generated by Django 5.0.4 on 2024-05-09 15:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_remove_product_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='price',
            field=models.DecimalField(decimal_places=2, default=50, max_digits=10),
            preserve_default=False,
        ),
    ]
