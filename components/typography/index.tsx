import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';

const typographyVariants = cva(
  'font-raleway font-regular text-[0.875rem] leading-[1.375rem] sm:text-[0.875rem] sm:leading-[1.375rem]',
  {
    variants: {
      as: {
        h1: 'font-bold text-[2rem] leading-[2.5rem] sm:text-[3.75rem] sm:leading-[4.75rem] 2xl:text-[5rem] 2xl:leading-[6rem] uppercase',
        h2: 'tracking-wide font-black text-[1.75rem] leading-[2.25rem] sm:text-[2.375rem] sm:leading-[2.75rem] 2xl:text-[3rem] 2xl:leading-[3.375rem]',
        h3: 'font-bold text-[1.25rem] leading-[1.875rem] sm:text-[1.375rem] sm:leading-[2rem] 2xl:text-[1.625rem] 2xl:leading-[2.25rem]',
        h4: 'font-bold text-[1.125rem] leading-[1.625rem] sm:text-[1.5rem] sm:leading-[2rem]',
        h5: 'font-bold text-[1rem] leading-[1.5rem] sm:text-[1.375rem] sm:leading-[1.75rem]',
        p: 'font-regular text-[0.875rem] leading-[1.375rem] font-raleway',
      },

      size: {
        small:
          'text-[0.875rem] leading-[1.375rem] sm:text-[0.875rem] sm:leading-[1.375rem]',
        medium:
          'text-[1rem] leading-[1.5rem] sm:text-[1rem] sm:leading-[1.5rem]',
        large:
          'text-[1.125rem] leading-[1.75rem] sm:text-[1.125rem] sm:leading-[1.75rem]',
        xLarge:
          'font-medium text-[1.375rem] leading-[2rem] sm:text-[1.25rem] sm:leading-[1.75rem] 2xl:text-[1.375rem] 2xl:leading-[2rem]',
      },
    },

    defaultVariants: {
      as: 'p',
    },
  }
);

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement & HTMLHeadingElement>,
    VariantProps<typeof typographyVariants> {
  theme?: string;
}

const Typography: React.FC<TypographyProps> = ({
  className,
  as,
  size,
  theme,
  ...props
}) => {
  switch (as) {
    case 'h1':
      return (
        <h1
          className={`${cn(typographyVariants({ as, size }), className)} text-${theme}`}
          {...props}
        >
          {props.children}
        </h1>
      );
    case 'h2':
      return (
        <h2
          className={`${cn(typographyVariants({ as, size }), className)} text-${theme}`}
          {...props}
        >
          {props.children}
        </h2>
      );
    case 'h3':
      return (
        <h3
          className={`${cn(typographyVariants({ as, size }), className)} text-${theme}`}
          {...props}
        >
          {props.children}
        </h3>
      );
    case 'h4':
      return (
        <h4
          className={`${cn(typographyVariants({ as, size }), className)} text-${theme}`}
          {...props}
        >
          {props.children}
        </h4>
      );
    case 'h5':
      return (
        <h5
          className={`${cn(typographyVariants({ as, size }), className)} text-${theme}`}
          {...props}
        >
          {props.children}
        </h5>
      );

    case 'p':
      return (
        <p
          className={`${cn(typographyVariants({ as, size }), className)} text-${theme}`}
          {...props}
        >
          {props.children}
        </p>
      );
    default:
      break;
  }
};

export default Typography;
